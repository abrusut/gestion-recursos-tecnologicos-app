// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API_URI_BACKEND: '/api', // Uri usada para las relaciones en save (@id:2 ==> @id: /api/{entity}/2)
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
