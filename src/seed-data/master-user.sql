INSERT INTO public.auth_client(
	client_name, client_description, 
	access_token_expiry,
	refresh_token_expiry, platform_name)
	VALUES ( 'VIRTUCARDS', 'web app', 1500000, 1500000, 'VirtuCards');

INSERT INTO public.permission(id, display_name, is_admin, scopes, fe_scopes, is_active)
VALUES 
  ('ADMIN', 'Admin', true, ARRAY['ALL::.*/api/*.*'], ARRAY['ALL::*'], true),
-- Insert Roles
INSERT INTO public.role(
  id, display_name, is_admin, is_default, permission_ids
)
VALUES 
  ('ADMIN', 'Admin', true, true, ARRAY['ADMIN']);

INSERT INTO public.user(
    username,
    password,
    email
)
VALUES (
    'test admin',
    '$2b$10$HSqWfUvX5WZhYV6om8jVzem1bBV4VDgjOtIBUkUZSCJ6.qRFWFZDS', 
    'chaudharyyajat@gmail.com'
);


INSERT INTO public.user_role( user_id, role_id)
	VALUES ( (select id from public.user where email='chaudharyyajat@gmail.com' ), 'ADMIN');
