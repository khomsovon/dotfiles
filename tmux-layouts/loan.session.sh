session_root "~/Documents/rails/loan"

if initialize_session "Loan"; then

  new_window "rails-server"
  run_cmd "rails s -p 3001"

  new_window "rails-console"
  run_cmd "rails c"
  
  new_window "commands"
  run_cmd "git status"

  new_window "vim"
  run_cmd "vim"

  select_window 1
fi

finalize_and_go_to_session
