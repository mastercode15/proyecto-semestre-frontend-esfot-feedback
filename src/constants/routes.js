/**
 * Created by chalosalvador on 17/01/2019.
 */

const publicRoutes = {
  LOGIN: '/ingreso',
  REGISTER: '/registro',
  ARTICLES: '/articulos',
  USERS: '/usuarios',
  USERS_ID: `/usuario/:id`,
  HOME: '/',
  ABOUT: '/acerca-de',
  NEWSURVEY: '/newSurvey',
  ANTD: '/antd',
  PROFILE: '/perfil'
};

const privateRoutes = {
  LOGOUT: '/logout',
  PRIVATE: '/survey',
  ARTICLE_ID: '/articulo/:id',
  PENDINGSURVEYS: '/pending surveys'
};

const Routes = {
  ...publicRoutes,
  ...privateRoutes
};
export default Routes;
