session_root "~/Documents/rails/todoapp"

if initialize_session "Todoapp"; then

  new_window "rails-server"
  run_cmd "./bin/rails s"

  new_window "commands"
  run_cmd "git status"

  new_window "vim"
  run_cmd "vim"

  select_window 1
fi

finalize_and_go_to_session
