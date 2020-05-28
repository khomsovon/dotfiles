session_root "/Applications/MAMP/htdocs/bongloy-demo-laravel"

if initialize_session "BongloyDemoLaravel"; then

  new_window "Laravel-server"
  run_cmd "php artisan serve"

  #new_window "NPM-server"
  #run_cmd "npm run watch"

  new_window "commands"
  run_cmd "git status"

  new_window "vim"
  run_cmd "vim"

  select_window 1
fi

finalize_and_go_to_session
