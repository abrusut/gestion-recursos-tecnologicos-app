export interface Usuario {
  username?: string;
  fullName?: string;
  email?: string;
  avatar?: string;
  avatarUrl?: string;
  roles?: Array<string>;
  id?: string;
  password?: string;
  retypedPassword?: string;
  newPassword?: string;
  newRetypedPassword?: string;
  oldPassword?: string;
  confirmationToken?: string;
  enabled?: boolean;
  passwordChangeDate?: Date;

}
