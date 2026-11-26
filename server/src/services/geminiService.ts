import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from '../config.js';
import { 
  AirQualityData, 
  WeatherData, 
  HouseholdProfile, 
  AIResponse, 
  AIResponseSchema, 
  DailyRoutineAction,
  WhatIfScenarioInput,
  WhatIfScenarioResult
} from '../types/index.js';

export class GeminiService {
  private static genAI: GoogleGenerativeAI | null = config.geminiApiKey 
    ? new GoogleGenerativeAI(config.geminiApiKey) 
    : null;

  /**
   * Safe execution wrapper with schema validation & deterministic fallback
   */
  private static async executeGeminiPrompt<T>(
    systemInstruction: string,
    prompt: string,
    validator: (data: unknown) => T,
    fallbackGenerator: () => T
  ): Promise<T> {
    if (!this.genAI || !config.geminiApiKey) {
      console.log('Gemini API key not configured. Using deterministic environmental AI reasoning engine.');
      return fallbackGenerator();
    }

    try {
      const model = this.genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
        systemInstruction,
        generationConfig: {
          temperature: 0.3, // Low temperature for factual, grounded environmental science
          responseMimeType: 'application/json',
        }
      });

      const result = await model.generateContent(prompt);
      const text = result.response.text();
      const parsed: unknown = JSON.parse(text);
      return validator(parsed);
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      console.warn('Gemini API call failed or timed out. Falling back to local intelligence engine:', errorMsg);
      return fallbackGenerator();
    }
  }

  /**
   * Context-Aware Environmental AI Chatbot
   */
  static async chat(
    messageHistory: { role: 'user' | 'assistant' | 'system'; content: string }[],
    environmentalData: AirQualityData,
    weather: WeatherData,
    profile?: HouseholdProfile
  ): Promise<{ reply: string; sources: string[]; limitations: string[] }> {
    const userQuestion = messageHistory[messageHistory.length - 1]?.content || '';
    
    // Check if key is available
    if (this.genAI && config.geminiApiKey) {
      try {
        const model = this.genAI.getGenerativeModel({
          model: 'gemini-1.5-flash',
          systemInstruction: `You are AirAware AI, an expert environmental and public health intelligence assistant specializing in urban air pollution and severe winter smog.
Current Location: ${environmentalData.location.name}
Current US AQI: ${environmentalData.aqi} (${environmentalData.category})
PM2.5: ${environmentalData.pollutants.pm2_5.value} ${environmentalData.pollutants.pm2_5.unit} (${environmentalData.pollutants.pm2_5.category})
PM10: ${environmentalData.pollutants.pm10.value} ${environmentalData.pollutants.pm10.unit}
Weather: ${weather.temperature}°C, ${weather.relativeHumidity}% humidity, Wind ${weather.windSpeed} km/h, ${weather.conditionText}
Household context: ${profile ? `Size: ${profile.householdSize}, Children: ${profile.hasChildren}, Elderly: ${profile.hasElderly}, Asthma/Respiratory: ${profile.hasAsthmaRespiratory}, Commute: ${profile.commuteMode}, Air Purifier: ${profile.hasAirPurifier}, N95 Masks: ${profile.hasN95Masks}, Budget: ${profile.budgetTier}` : 'Standard urban household'}

CRITICAL GUIDELINES:
1. Always ground advice in current PM2.5/AQI numbers. Never fabricate readings.
2. If AQI > 150 (Unhealthy), advise avoiding outdoor cardio; recommend certified N95/FFP2 masks for mandatory transit.
3. For indoor air: clarify that opening windows during winter thermal inversions worsens indoor PM2.5 unless an afternoon dispersion window occurs.
4. Clearly state practical alternatives, cost considerations, and limitations.
5. NEVER provide medical diagnosis or prescribe medicine. Include an informative disclaimer when health is discussed.
6. Format your answer with clean markdown, bullet points, and concise actionable steps.`,
        });

        const chat = model.startChat({
          history: messageHistory.slice(0, -1).map(m => ({
            role: m.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: m.content }]
          }))
        });

        const res = await chat.sendMessage(userQuestion);
        return {
          reply: res.response.text(),
          sources: ['Open-Meteo Air Quality Model (CAMS Copernicus)', 'US EPA AQI Standards', 'WHO Global Air Quality Guidelines (2021)'],
          limitations: [
            'Guidance is informational and environmental, not personalized medical advice.',
            'Local micro-climates and roadside proximity can alter actual exposure levels.'
          ]
        };
      } catch (err) {
        console.warn('Gemini chat error, using fallback:', err);
      }
    }

    // Deterministic environmental expert response
    return this.generateFallbackChatReply(userQuestion, environmentalData, weather, profile);
  }

  /**
   * Deterministic conversational expert fallback
   */
  private static generateFallbackChatReply(
    question: string,
    aq: AirQualityData,
    weather: WeatherData,
    profile?: HouseholdProfile
  ) {
    const q = question.toLowerCase();
    const aqi = aq.aqi;
    const pm25 = aq.pollutants.pm2_5.value;
    const isSensitive = profile?.hasAsthmaRespiratory || profile?.hasChildren || profile?.hasElderly;

    let reply = '';
    const limitations = [
      'Guidance is based on macro atmospheric modeling and user-reported household profile.',
      'Always consult a qualified healthcare provider for personal respiratory medical advice.'
    ];

    if (q.includes('exercise') || q.includes('walk') || q.includes('run') || q.includes('outdoor')) {
      if (aqi > 200) {
        reply = `### ⚠️ Outdoor Exercise Advisory: Avoid High-Exertion Activities\n\n` +
          `With the current **AQI at ${aqi} (${aq.category})** and PM2.5 at **${pm25} µg/m³**, outdoor cardiovascular exercise poses significant respiratory strain. High ventilation rates during exercise pull microscopic PM2.5 particles deep into alveoli.\n\n` +
          `**Actionable Recommendations:**\n` +
          `- **Shift Indoors:** Substitute running or outdoor cycling with indoor bodyweight training, yoga, or treadmill sessions.\n` +
          `- **Vulnerable Members:** Children and sensitive individuals should remain strictly indoors in sealed or air-filtered spaces.\n` +
          `- **If Out & About:** Wear a snug-fitting **N95/FFP2 respirator** for any essential walking. Note that surgical and cloth masks do not effectively filter fine PM2.5 aerosols.`;
      } else if (aqi > 100) {
        reply = `### 🟡 Moderate to Sensitive Activity Notice\n\n` +
          `The current **AQI is ${aqi} (${aq.category})**.\n\n` +
          `${isSensitive ? 'Since your household includes sensitive or respiratory-vulnerable members, outdoor workouts are not recommended right now.' : 'Healthy adults can engage in light outdoor walking, but prolonged high-intensity training should be curtailed or scheduled for midday when thermal inversions disperse.'}\n\n` +
          `**Optimal Window:** Review the 24-hour trend chart; afternoons (12:00 PM – 3:30 PM) typically offer better dispersion than early morning smog peaks.`;
      } else {
        reply = `### 🟢 Good Outdoor Conditions\n\n` +
          `The current **AQI is ${aqi} (${aq.category})** with PM2.5 at **${pm25} µg/m³** in ${aq.location.name}. Air quality is favorable for outdoor walking, running, and commuting without special particulate restrictions.`;
      }
    } else if (q.includes('window') || q.includes('ventilat') || q.includes('fresh air')) {
      if (aqi > 150) {
        reply = `### 🛑 Window Ventilation Advisory: Keep Windows Closed\n\n` +
          `Because outdoor PM2.5 is **${pm25} µg/m³ (${aq.category})**, opening windows will draw heavy ambient smog into your living spaces.\n\n` +
          `**Indoor Strategies:**\n` +
          `- **Seal Gaps:** Keep external doors and windows firmly closed. Use weather-stripping or damp towels along drafts if smog smell permeates.\n` +
          `- **Ventilation Timing:** If indoor CO2 builds up, only crack windows open briefly (5-10 minutes) around 2:00 PM - 3:30 PM when surface warming dilutes ground-level pollution.\n` +
          `- **Cooking:** Always turn on kitchen exhaust hoods while cooking to avoid compounding indoor particulate loads.`;
      } else {
        reply = `### 🪟 Ventilation is Safe\n\n` +
          `Current outdoor AQI is **${aqi} (${aq.category})**. Natural cross-ventilation is recommended to clear indoor stale air, volatile organic compounds (VOCs), and metabolic CO2.`;
      }
    } else if (q.includes('purifier') || q.includes('indoor') || q.includes('filter')) {
      reply = `### 🏠 Indoor Air Quality Optimization Plan\n\n` +
        `Indoor air can become 2x-5x more polluted than outdoor air if indoor sources are neglected during smog episodes:\n\n` +
        `1. **Eliminate Combustion:** Completely avoid burning incense, scented candles, mosquito coils, or unvented space heaters.\n` +
        `2. **High-Efficiency Filtration:** ${profile?.hasAirPurifier ? 'Keep your HEPA air purifier running on medium/auto in the most frequently occupied room (usually the bedroom).' : 'Without a commercial purifier, construct a Corsi-Rosenthal box using a standard box fan and MERV-13 furnace filter for low-cost, high-CADR filtration.'}\n` +
        `3. **Wet Mopping:** Use damp microfiber cloths rather than dry brooms to capture settled particulate matter without kicking it back into suspension.`;
    } else {
      reply = `### 🌿 Environmental Intelligence Summary for ${aq.location.name}\n\n` +
        `Current conditions: **AQI ${aqi} (${aq.category})** | PM2.5: **${pm25} µg/m³** | Temp: **${weather.temperature}°C** | Humidity: **${weather.relativeHumidity}%**.\n\n` +
        `**Key Priorities for Your Household:**\n` +
        `- Protect vulnerable members (${profile?.hasChildren ? 'children' : ''} ${profile?.hasElderly ? 'elderly' : ''} ${profile?.hasAsthmaRespiratory ? 'respiratory sensitivity' : ''}).\n` +
        `- Prioritize low-emission electric or mass transit to reduce urban baseline emissions.\n` +
        `- Monitor diurnal smog shifts: pollution peaks in early morning (6–9 AM) due to atmospheric boundary layer contraction.`;
    }

    return {
      reply,
      sources: ['Open-Meteo Air Quality Model', 'Copernicus Atmosphere Monitoring Service (CAMS)', 'EPA AirNow Standards'],
      limitations
    };
  }

  /**
   * Personalized AI Recommendations Engine (Structured Zod Output)
   */
  static async getRecommendations(
    environmentalData: AirQualityData,
    weather: WeatherData,
    profile?: HouseholdProfile
  ): Promise<AIResponse> {
    const fallback = (): AIResponse => {
      const aqi = environmentalData.aqi;
      const isSevere = aqi >= 150;
      const isSensitive = profile?.hasAsthmaRespiratory || profile?.hasChildren || profile?.hasElderly;

      const riskLevel = aqi <= 50 ? 'low' : aqi <= 100 ? 'moderate' : aqi <= 200 ? 'high' : 'very_high';

      const recommendations = [
        {
          title: isSevere ? 'Equip N95 Respirators for Essential Transit' : 'Standard Outdoor Transit',
          action: isSevere ? 'Ensure all household members wear NIOSH-approved N95 or KN95 respirators with tight facial seal during travel.' : 'Walk or transit normally; monitor afternoon changes.',
          reason: isSevere ? `Ambient PM2.5 is at ${environmentalData.pollutants.pm2_5.value} µg/m³, which exceeds WHO 24-hr guidelines by ${Math.round(environmentalData.pollutants.pm2_5.value / 15)}x.` : 'Air quality is within acceptable limits.',
          impact: isSevere ? 'Filters >= 95% of airborne particulates down to 0.3 microns.' : 'Maintains safe exposure profile.',
          cost_level: isSevere ? 'low' as const : 'free' as const,
          priority: isSevere ? 'high' as const : 'low' as const,
          category: 'commute' as const
        },
        {
          title: 'Diurnal Window Sealing & Micro-Ventilation',
          action: isSevere ? 'Keep windows latched shut; seal drafty floor sills with damp towels or silicone draft stoppers.' : 'Open opposite windows for 20 minutes of cross-breeze.',
          reason: isSevere ? 'Winter temperature inversions trap surface particulate matter under a cold ceiling of air.' : 'Fresh outdoor air lowers indoor CO2 and TVOC levels.',
          impact: isSevere ? 'Prevents indoor PM2.5 from reaching parity with outdoor smog.' : 'Refreshes indoor air volume without pollution influx.',
          cost_level: 'free' as const,
          priority: isSevere ? 'high' as const : 'medium' as const,
          category: 'indoor' as const
        },
        {
          title: isSevere ? 'Shift High-Exertion Exercise to Filtered Indoor Space' : 'Active Outdoor Mobility',
          action: isSevere ? 'Replace morning outdoor running with indoor calisthenics, resistance bands, or pilates.' : 'Enjoy outdoor cardio before dusk.',
          reason: isSevere ? 'Vigorous breathing bypasses nasal filtration, increasing lung deposition of black carbon.' : 'Low pollutant concentrations support cardiovascular exercise.',
          impact: 'Reduces inhaled particulate volume by up to 70% during peak smog hours.',
          cost_level: 'free' as const,
          priority: isSensitive ? 'high' as const : 'medium' as const,
          category: 'outdoor' as const
        },
        {
          title: 'Errand Consolidation & Cold-Start Reduction',
          action: 'Batch multiple vehicular errands into a single trip or utilize public electric transit.',
          reason: 'Vehicle catalytic converters require warm-up time; short cold trips generate up to 5x more emissions per kilometer.',
          impact: 'Avoids ~1.8 kg of CO2 and 12g of direct tailpipe PM per eliminated vehicle trip.',
          cost_level: 'free' as const,
          priority: 'medium' as const,
          category: 'sustainability' as const
        }
      ];

      return {
        summary: `Air quality in ${environmentalData.location.name} is currently ${environmentalData.category} (AQI ${aqi}, PM2.5: ${environmentalData.pollutants.pm2_5.value} µg/m³). ${isSevere ? 'Protective respiratory barriers and indoor sealing are strongly advised.' : 'Conditions are favorable for normal daily activities.'}`,
        risk_level: riskLevel,
        recommendations,
        alternatives: [
          'Use high-MERV HVAC filters or DIY Corsi-Rosenthal boxes if commercial air purifiers are unavailable.',
          'Car-pool or rely on subway/metro networks to bypass road-level exhaust canyons.',
          'Utilize HEPA vacuuming and wet wiping rather than sweeping to avoid particulate re-suspension.'
        ],
        limitations: [
          'Recommendations apply to regional ambient air metrics and may vary near major industrial corridors.',
          'Does not replace medical treatment plans for pre-existing respiratory or cardiac disorders.'
        ]
      };
    };

    const prompt = `Generate structured recommendations based on:
Location: ${environmentalData.location.name}
AQI: ${environmentalData.aqi} (${environmentalData.category})
PM2.5: ${environmentalData.pollutants.pm2_5.value} µg/m³
Weather: ${weather.temperature}°C, humidity ${weather.relativeHumidity}%, wind ${weather.windSpeed} km/h
Household Profile: ${JSON.stringify(profile || {})}
Respond strictly with valid JSON conforming to the schema.`;

    const systemInstruction = `You are AirAware AI's expert environmental recommendation engine. Output strictly valid JSON with keys: summary, risk_level ('low'|'moderate'|'high'|'very_high'), recommendations (array of {title, action, reason, impact, cost_level, priority, category}), alternatives, limitations.`;

    return this.executeGeminiPrompt(
      systemInstruction,
      prompt,
      (data) => AIResponseSchema.parse(data),
      fallback
    );
  }

  /**
   * Dynamic Daily Routine Planner
   */
  static async generateDailyPlan(
    environmentalData: AirQualityData,
    weather: WeatherData,
    profile?: HouseholdProfile
  ): Promise<DailyRoutineAction[]> {
    const aqi = environmentalData.aqi;
    const isHigh = aqi >= 150;
    
    // Construct dynamic hourly plan grounded in diurnal smog cycles
    const plan: DailyRoutineAction[] = [
      {
        id: 'act-1',
        time: '07:00 AM',
        recommendation: isHigh ? 'Seal bedroom windows & run indoor air circulation' : 'Open bedroom windows for fresh air cross-breeze',
        reason: isHigh ? 'Morning ground-level temperature inversion concentrates smog close to living areas.' : 'Morning ambient air is clean and crisp.',
        alternative: isHigh ? 'Use an exhaust fan with backdraft damper if cooking.' : 'Keep windows cracked for 15 minutes.',
        priority: isHigh ? 'high' : 'medium',
        category: 'indoor',
        completed: false,
        expectedBenefit: isHigh ? 'Blocks 80% of morning smog intrusion into sleep spaces.' : 'Lowers overnight bedroom CO2 levels.'
      },
      {
        id: 'act-2',
        time: '08:30 AM',
        recommendation: isHigh ? 'Transit commute with sealed N95/KN95 respirator' : 'Commute via active transit (bike or walk)',
        reason: isHigh ? 'Rush-hour roadside NO2 and PM2.5 levels spike significantly.' : 'Moderate exercise and zero tailpipe emissions.',
        alternative: isHigh ? 'Car pool or utilize metro/subway where underground air is buffered.' : 'Use public bus or rideshare.',
        priority: isHigh ? 'high' : 'medium',
        category: 'commute',
        completed: false,
        expectedBenefit: isHigh ? 'Protects pulmonary airways from direct combustion soot.' : 'Saves approx. 1.2 kg CO2 compared to solo driving.'
      },
      {
        id: 'act-3',
        time: '12:30 PM',
        recommendation: 'Indoor lunch & hydrate; assess mid-day dispersion window',
        reason: 'Solar radiation warms surface air, breaking early inversion layer and slightly diluting particulate concentrations.',
        alternative: 'If walking between buildings, choose back streets away from heavy truck arteries.',
        priority: 'low',
        category: 'outdoor',
        completed: false,
        expectedBenefit: 'Hydration thins respiratory mucus layer, boosting natural mucosal clearance.'
      },
      {
        id: 'act-4',
        time: '02:00 PM',
        recommendation: isHigh ? 'Quick 10-minute micro-ventilation if indoor air feels stale' : 'Full office / home ventilation window',
        reason: 'Midday typically offers the lowest diurnal PM2.5 levels before evening traffic and cooling set in.',
        alternative: 'Use indoor air purifier on turbo setting instead of opening windows.',
        priority: 'medium',
        category: 'indoor',
        completed: false,
        expectedBenefit: 'Balances indoor CO2 build-up while minimizing smog intake.'
      },
      {
        id: 'act-5',
        time: '05:30 PM',
        recommendation: 'Consolidated evening transit; avoid vehicle idling in pick-up zones',
        reason: 'Evening rush hour combines cooling temperatures with peak vehicle exhaust emissions.',
        alternative: 'Wait 30 minutes until peak traffic subsides before commuting.',
        priority: 'high',
        category: 'sustainability',
        completed: false,
        expectedBenefit: 'Eliminates unnecessary exhaust exposure and cuts idling fuel waste.'
      },
      {
        id: 'act-6',
        time: '07:30 PM',
        recommendation: isHigh ? 'Indoor home workout; wipe down entryway shoes with damp cloth' : 'Evening walk or park recreation',
        reason: isHigh ? 'Outdoor particulate levels re-surge after sunset.' : 'Cool pleasant evening conditions.',
        alternative: isHigh ? 'Gentle stretching or yoga in filtered room.' : 'Indoor gym workout.',
        priority: isHigh ? 'high' : 'low',
        category: 'outdoor',
        completed: false,
        expectedBenefit: isHigh ? 'Prevents heavy breathing intake of evening smog particulates.' : 'Cardiovascular fitness benefit.'
      },
      {
        id: 'act-7',
        time: '10:00 PM',
        recommendation: 'Engage sleep mode on air purifier; ensure windows remain latched',
        reason: 'Overnight cooling traps nocturnal emissions at ground level until next morning.',
        alternative: 'If no air purifier, ensure door is closed to limit living room air exchange.',
        priority: 'high',
        category: 'indoor',
        completed: false,
        expectedBenefit: 'Reduces 8 hours of continuous overnight particulate inhalation by up to 85%.'
      }
    ];

    return plan;
  }

  /**
   * What-If Impact Simulator Engine
   */
  static simulateWhatIfScenario(input: WhatIfScenarioInput, aqi: number): WhatIfScenarioResult {
    const usual = input.usualRoutine;
    const opt = input.optimizedAlternative;

    // Emission calculation factors (kg CO2 per km)
    const emissionFactors: Record<string, number> = {
      'car': 0.192,
      'transit': 0.045,
      'bike': 0.005,
      'walk': 0.0,
      'remote': 0.0
    };

    const usualFactor = emissionFactors[usual.commuteMode.toLowerCase()] ?? 0.18;
    const optFactor = emissionFactors[opt.commuteMode.toLowerCase()] ?? 0.04;

    // Errand factor: ~4 km per errand trip
    const usualErrandEmissions = usual.errandsTrips * 4 * 0.192;
    const optErrandEmissions = opt.errandsTrips * 4 * 0.192;

    const baselineEmissions = Number(((usual.commuteDistanceKm * 2 * usualFactor) + usualErrandEmissions).toFixed(2));
    const optimizedEmissions = Number(((opt.commuteDistanceKm * 2 * optFactor) + optErrandEmissions).toFixed(2));
    const emissionsAvoided = Number(Math.max(0, baselineEmissions - optimizedEmissions).toFixed(2));

    // Exposure calculation: based on outdoor minutes, AQI, and mask/timing protection
    const usualExposurePoints = (usual.outdoorExerciseMinutes * (aqi / 100)) + (usual.commuteDistanceKm * 1.5 * (aqi / 100));
    const optExposurePoints = (opt.outdoorExerciseMinutes * (aqi / 100) * 0.25) + (opt.commuteDistanceKm * 0.8 * (aqi / 100)); // shielded/shifted

    const baselineScore = Math.min(100, Math.round(usualExposurePoints * 1.5));
    const optScore = Math.min(100, Math.round(optExposurePoints * 1.5));
    const exposureReductionPct = Math.round(Math.max(0, ((baselineScore - optScore) / Math.max(1, baselineScore)) * 100));

    return {
      baselineExposureScore: baselineScore,
      optimizedExposureScore: optScore,
      exposureReductionPct: Math.min(95, Math.max(10, exposureReductionPct)),
      baselineEmissionsKgCO2: baselineEmissions,
      optimizedEmissionsKgCO2: optimizedEmissions,
      emissionsAvoidedKgCO2: emissionsAvoided,
      convenienceRating: 'similar',
      estimatedCostImpact: baselineEmissions > optimizedEmissions ? 'savings' : 'neutral',
      summary: `By switching to optimized routing, consolidating ${usual.errandsTrips} errand trips into ${opt.errandsTrips}, and shifting high-exertion workouts indoors, your personal pollution exposure is reduced by an estimated ${Math.min(95, Math.max(10, exposureReductionPct))}% while preventing ${emissionsAvoided} kg of CO2 emissions.`,
      assumptions: [
        'Vehicular emissions calculated at 192g CO2/km (average petrol/diesel passenger vehicle).',
        'Public transit emissions calculated at 45g CO2/passenger-km.',
        'Errand trips assume an average round-trip urban distance of 4.0 km.',
        'Exposure scores model respiratory volume and ambient PM2.5 concentrations; these are mathematical estimates, not clinical health measures.'
      ],
      keyDifferences: [
        {
          dimension: 'Commute Method',
          usual: `${usual.commuteMode.toUpperCase()} (${usual.commuteDistanceKm} km)`,
          optimized: `${opt.commuteMode.toUpperCase()} (${opt.commuteDistanceKm} km)`,
          benefit: opt.commuteMode !== usual.commuteMode ? 'Reduced direct tailpipe inhalation and fuel savings.' : 'Maintained efficient distance.'
        },
        {
          dimension: 'Errand Strategy',
          usual: `${usual.errandsTrips} separate vehicle trips`,
          optimized: `${opt.errandsTrips} consolidated trip(s)`,
          benefit: `Avoids cold-engine high emission starts; saves ${((usual.errandsTrips - opt.errandsTrips) * 4 * 0.192).toFixed(1)} kg CO2.`
        },
        {
          dimension: 'Exercise Routine',
          usual: `${usual.outdoorExerciseMinutes} mins outdoor (${usual.outdoorExerciseTime})`,
          optimized: `${opt.outdoorExerciseMinutes} mins indoor / off-peak (${opt.outdoorExerciseTime})`,
          benefit: 'Bypasses peak particulate inhalation during diurnal inversion hours.'
        }
      ]
    };
  }
}
