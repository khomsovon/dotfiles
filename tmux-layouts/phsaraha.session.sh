session_root "/Applications/MAMP/htdocs/phsaraha"

if initialize_session "Phsaraha"; then

  new_window "Phsaraha-server"
  run_cmd "php artisan serve"

  #new_window "NPM-server"
  #run_cmd "npm run watch"

  new_window "commands"
  run_cmd "git status"

  new_window "vim"
  run_cmd "nvim"

  select_window 1
fi

finalize_and_go_to_session
