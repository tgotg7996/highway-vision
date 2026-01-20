import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

/**
 * Middleware factory to validate request data against a Joi schema
 */
export const validate = (schema: Joi.ObjectSchema, property: 'body' | 'query' | 'params' = 'body') => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));

      return res.status(400).json({
        success: false,
        error: 'Validation error',
        details: errors
      });
    }

    // Replace request data with validated and sanitized value
    req[property] = value;
    next();
  };
};

// Common validation schemas
export const schemas = {
  // UUID parameter
  uuidParam: Joi.object({
    id: Joi.string().uuid().required()
  }),

  // Pagination query
  paginationQuery: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(20)
  }),

  // Algorithm creation/update
  algorithm: Joi.object({
    name: Joi.string().max(100).required(),
    description: Joi.string().allow('').optional(),
    accuracy: Joi.number().min(0).max(100).optional(),
    status: Joi.string().valid('online', 'offline').optional(),
    icon: Joi.string().max(50).optional(),
    color: Joi.string().max(20).optional(),
    type: Joi.string().max(50).optional()
  }),

  // Camera feed creation/update
  cameraFeed: Joi.object({
    name: Joi.string().max(100).required(),
    location: Joi.string().max(200).required(),
    ip: Joi.string().max(50).optional(),
    latency: Joi.string().max(20).optional(),
    status: Joi.string().valid('online', 'offline', 'warning').optional(),
    thumbnail: Joi.string().optional(),
    stream_url: Joi.string().uri().optional()
  }),

  // Event log creation/update
  eventLog: Joi.object({
    location: Joi.string().max(200).required(),
    type: Joi.string().max(50).required(),
    risk_level: Joi.string().valid('high', 'medium', 'low').default('low'),
    status: Joi.string().valid('handled', 'pending', 'observing').default('pending'),
    camera_id: Joi.string().uuid().optional(),
    algorithm_id: Joi.string().uuid().optional(),
    description: Joi.string().optional(),
    snapshot_url: Joi.string().uri().optional()
  }),

  // User profile update
  userProfile: Joi.object({
    name: Joi.string().max(100).optional(),
    role: Joi.string().valid('admin', 'operator', 'viewer').optional(),
    status: Joi.string().valid('active', 'inactive').optional(),
    permissions: Joi.array().items(Joi.string()).optional()
  }),

  // System setting update
  systemSetting: Joi.object({
    value: Joi.any().required(),
    description: Joi.string().optional()
  })
};
