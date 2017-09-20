# Make sure the Apt package lists are up to date, so we're downloading versions 
# that exist.
cookbook_file "apt-sources.list" do
  path "/etc/apt/sources.list"
end
execute 'apt_update' do
  command 'apt-get update'
end

# Base configuration recipe in Chef.
package "wget"
package "ntp"
cookbook_file "ntp.conf" do
  path "/etc/ntp.conf"
end
execute 'ntp_restart' do
  command 'service ntp restart'
end

# Tech evaluation.
package "nginx"
package "postgresql"
cookbook_file "nginx-default" do
  path "/etc/nginx/sites-available/default"
end
cookbook_file "nginx.conf" do
  path "/etc/nginx/nginx.conf"
end
execute 'restart_nginx' do
  command 'sudo systemctl restart nginx'
end