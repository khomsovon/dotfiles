session_root "Documents/app/bongloy-demo-ionic"

if initialize_session "BongloyDemoIonic"; then

  new_window "Ionic-server"
  run_cmd "ionic lab"

  #new_window "NPM-server"
  #run_cmd "npm run watch"

  new_window "commands"
  run_cmd "git status"

  new_window "vim"
  run_cmd "vim"

  select_window 1
fi

finalize_and_go_to_session
