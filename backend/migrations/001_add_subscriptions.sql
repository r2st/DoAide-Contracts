-- Migration: Add Razorpay subscription support
-- Run against PostgreSQL: psql -U contracts -d doaide_contracts -f 001_add_subscriptions.sql

BEGIN;

-- Add razorpay_customer_id to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS razorpay_customer_id VARCHAR(255);

-- Update user plan enum: rename 'business' to 'enterprise' for existing rows
UPDATE users SET plan = 'enterprise' WHERE plan = 'business';

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    razorpay_subscription_id VARCHAR(255) NOT NULL UNIQUE,
    razorpay_plan_id VARCHAR(255) NOT NULL,
    plan VARCHAR(20) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'created',
    amount INTEGER NOT NULL,
    currency VARCHAR(10) NOT NULL DEFAULT 'INR',
    current_period_start TIMESTAMPTZ,
    current_period_end TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS ix_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS ix_subscriptions_razorpay_subscription_id ON subscriptions(razorpay_subscription_id);

COMMIT;
