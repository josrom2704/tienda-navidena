// Configuración de base de datos para desarrollo y producción
export const DATABASE_CONFIG = {
  // Configuración de desarrollo (local)
  development: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'tienda_navidena',
    dialect: 'mysql' as const
  },
  
  // Configuración de producción (nube)
  production: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'tienda_navidena',
    dialect: 'mysql' as const,
    ssl: true,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
};

// Función para obtener la configuración según el entorno
export function getDatabaseConfig() {
  const env = process.env.NODE_ENV || 'development';
  return DATABASE_CONFIG[env as keyof typeof DATABASE_CONFIG];
}

// Función para obtener la URL de conexión
export function getDatabaseUrl() {
  const config = getDatabaseConfig();
  return `${config.dialect}://${config.user}:${config.password}@${config.host}:${config.port}/${config.database}`;
}

// Función para verificar si estamos en producción
export function isProduction() {
  return process.env.NODE_ENV === 'production';
}

