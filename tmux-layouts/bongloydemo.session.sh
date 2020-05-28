session_root "~/Documents/rails/bongloy-demo"
 
if initialize_session "Bongloydemo"; then

  new_window "rails-server"
  run_cmd "./bin/rails s"

  new_window "commands"
  run_cmd "git status"

  new_window "vim"
  run_cmd "vim"

  select_window 1
fi

finalize_and_go_to_session
