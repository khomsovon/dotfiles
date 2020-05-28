session_root "~/Documents/python/bongloyDjango"

if initialize_session "BongloyDjango"; then

  new_window "django-server"
  run_cmd "python manage.py runserver"

  new_window "commands"
  run_cmd "git status"

  new_window "vim"
  run_cmd "vim"

  select_window 1
fi

finalize_and_go_to_session
