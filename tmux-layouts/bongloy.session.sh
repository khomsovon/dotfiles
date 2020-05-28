session_root "~/Documents/rails/bongloy-core"

if initialize_session "Bongloy"; then

  new_window "rails-server"
  run_cmd "./bin/rails s"

  new_window "commands"
  run_cmd "git status"

  new_window "nvim"
  run_cmd "nvim"

  select_window 1
fi

finalize_and_go_to_session
