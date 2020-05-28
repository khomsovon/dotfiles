session_root "~/Documents/rails/bongloy-marketplace"

if initialize_session "Marketplace"; then

  new_window "rails-server"
  run_cmd "./bin/rails s"

  new_window "commands"
  run_cmd "git status"

  new_window "Nvim"
  run_cmd "nvim"

  select_window 1
fi

finalize_and_go_to_session
