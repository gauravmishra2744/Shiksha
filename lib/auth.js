import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export function getAuthUser(request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }

    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
}

export function requireAuth(handler) {
  return async (request, context) => {
    const user = getAuthUser(request);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized - Please login' },
        { status: 401 }
      );
    }

    // Attach user to request
    request.user = user;
    return handler(request, context);
  };
}

export function requireRole(roles) {
  return (handler) => {
    return async (request, context) => {
      const user = getAuthUser(request);
      
      if (!user) {
        return NextResponse.json(
          { error: 'Unauthorized - Please login' },
          { status: 401 }
        );
      }

      if (!roles.includes(user.role)) {
        return NextResponse.json(
          { error: 'Forbidden - Insufficient permissions' },
          { status: 403 }
        );
      }

      request.user = user;
      return handler(request, context);
    };
  };
}
