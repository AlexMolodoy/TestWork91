export interface LandingConfig {
  port: 5000
  env: 'development' | 'production'
  secretKey: string
  refreshSecretKey: string
  corsOrigin: string | string[]
}
