export enum PagesTypes {
  Loading = 'Loading',
  Login = 'login',
  Register = 'Register',
  Home = 'Home',
}

export type MainPagesParams = {
  [PagesTypes.Loading]: undefined;
  [PagesTypes.Login]: undefined;
  [PagesTypes.Register]: undefined;
  [PagesTypes.Home]: undefined;
};
