session_root "Documents/React/phsaraha"

if initialize_session "ReactNative"; then

  new_window "React-server"
  run_cmd "react-native run-ios"

  #new_window "NPM-server"
  #run_cmd "npm run watch"

  new_window "commands"
  run_cmd "git status"

  new_window "vim"
  run_cmd "vim"

  select_window 1
fi

finalize_and_go_to_session
