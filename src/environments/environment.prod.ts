export const environment = {
  production: true,
  REGISTROS_PER_PAGE : 10,
  URL_API : 'http://localhost:83/gestion-recursos-tecnologicos-ms/public/index.php/api',
  URL_RESOURCES : 'http://localhost:83/gestion-recursos-tecnologicos-ms/public',
  ROLE_SUPER_ADMIN : 'ROLE_SUPER_ADMIN',
  ROLE_USER : 'ROLE_USER',
  ROLE_VIEWER : 'ROLE_VIEWER',
  ROLE_ADMIN : 'ROLE_ADMIN',
  ROLES_ARRAY: ['ROLE_SUPER_ADMIN', 'ROLE_USER', 'ROLE_VIEWER', 'ROLE_ADMIN' ],
  ROLES_JERARQUIA: {
    ROLE_SUPER_ADMIN: ['ROLE_SUPER_ADMIN', 'ROLE_USER', 'ROLE_VIEWER', 'ROLE_ADMIN' ],
    ROLE_ADMIN: ['ROLE_ADMIN', 'ROLE_USER', 'ROLE_VIEWER' ],
    ROLE_USER: ['ROLE_VIEWER', 'ROLE_USER'],
    ROLE_VIEWER: ['ROLE_VIEWER']
  },
  ATRIBUTE_MINISTERIO : 'MINISTERIO DE PRODUCCION',
  ATRIBUTE_SISTEMA_NAME : 'Gestion Recursos Tecnologicos',
  AUTOR_NAME: 'Andres Brusutti',
  KEYWORDS: 'Ministerio Produccion, Santa Fe',
  BADWORDS: ['SELECT', 'INSERT', 'FROM', 'UPDATE', 'DELETE']
};
