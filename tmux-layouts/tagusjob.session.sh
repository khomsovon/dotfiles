session_root "/Applications/MAMP/htdocs/tagusjob"

if initialize_session "Tagusjob"; then

  new_window "Tagusjob-server"
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
