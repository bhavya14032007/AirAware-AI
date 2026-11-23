import { Request, Response, NextFunction } from 'express';
import { createClient } from '@supabase/supabase-js';
import { config } from '../config.js';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    isDemoUser?: boolean;
  };
}

const supabase = (config.supabaseUrl && config.supabaseAnonKey)
  ? createClient(config.supabaseUrl, config.supabaseAnonKey)
  : null;

export async function authMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  // If running in demo mode or no Supabase keys configured, provide seamless demo user
  if (!supabase || !authHeader || authHeader.startsWith('Bearer demo-')) {
    req.user = {
      id: 'demo-household-user-001',
      email: 'demo@airaware.ai',
      isDemoUser: true
    };
    return next();
  }

  const token = authHeader.replace(/^Bearer\s+/i, '');

  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      // Fallback to demo user if token is invalid rather than hard crash
      req.user = {
        id: 'demo-household-user-001',
        email: 'demo@airaware.ai',
        isDemoUser: true
      };
      return next();
    }

    req.user = {
      id: user.id,
      email: user.email || 'user@airaware.ai',
      isDemoUser: false
    };
    next();
  } catch (err) {
    req.user = {
      id: 'demo-household-user-001',
      email: 'demo@airaware.ai',
      isDemoUser: true
    };
    next();
  }
}
