#!/usr/bin/env bash
set -euo pipefail
# Simple wrapper to create a venv and run the manage_models script
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
VENV_DIR="$ROOT_DIR/.venv"
PY="$VENV_DIR/bin/python"

if [ ! -d "$VENV_DIR" ]; then
  python3 -m venv "$VENV_DIR"
  "$PY" -m pip install --upgrade pip
  "$PY" -m pip install -r "$ROOT_DIR/requirements.txt"
fi

exec "$PY" "$ROOT_DIR/scripts/manage_models.py" "$@"
