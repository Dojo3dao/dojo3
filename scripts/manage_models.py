#!/usr/bin/env python3
import argparse
import subprocess
import sys
from pathlib import Path
import yaml


def load_config(path: Path):
    with path.open("r", encoding="utf-8") as f:
        return yaml.safe_load(f)


def save_config(path: Path, data):
    with path.open("w", encoding="utf-8") as f:
        yaml.safe_dump(data, f, sort_keys=False)


def run_shell(cmd: str, dry_run: bool):
    print(f"> {cmd}")
    if dry_run:
        return 0
    return subprocess.run(cmd, shell=True).returncode


def main():
    p = argparse.ArgumentParser(description="Manage local model pulls from config")
    p.add_argument("--config", default="config/models_config.yaml")
    p.add_argument("--dry-run", action="store_true")
    p.add_argument("--yes", action="store_true", help="Assume yes for prompts")
    p.add_argument("--force", action="store_true", help="Force re-pull even if already marked pulled")
    p.add_argument("--run", metavar="MODEL_KEY", help="Run a pulled model by config key (attempts to use ollama run)")
    args = p.parse_args()

    cfg_path = Path(args.config)
    if not cfg_path.exists():
        print(f"Config not found: {cfg_path}")
        sys.exit(2)

    data = load_config(cfg_path)
    models = data.get("models", {})

    if args.run:
        key = args.run
        if key not in models:
            print(f"Model key not found: {key}")
            sys.exit(2)
        entry = models[key]
        pull_cmd = entry.get("pull_command")
        if not pull_cmd:
            print("No pull_command in config for this model; cannot infer image to run")
            sys.exit(2)
        # Attempt to infer image name (last token of pull_command)
        image = pull_cmd.strip().split()[-1]
        run_cmd = f"ollama run {image}"
        print(f"Running model '{key}' as: {run_cmd}")
        rc = run_shell(run_cmd, args.dry_run)
        sys.exit(rc)

    updated = False
    missing_ollama = subprocess.run("command -v ollama >/dev/null 2>&1", shell=True).returncode != 0
    if missing_ollama:
        print("Warning: 'ollama' not found in PATH. Pull commands may fail.")
        if not args.yes:
            print("Install Ollama first: https://ollama.com/docs#getting-started")

    for key, entry in models.items():
        pull_cmd = entry.get("pull_command")
        pulled_flag = entry.get("pulled", False)
        enabled = entry.get("enabled", True)

        if not pull_cmd:
            print(f"Skipping {key}: no pull_command")
            continue

        should_pull = args.force or (not pulled_flag)
        if not should_pull:
            print(f"Skipping {key}: already marked pulled")
            continue

        print(f"Preparing to pull model '{key}'")
        if not args.yes and not args.dry_run:
            resp = input(f"Run: {pull_cmd}? [y/N]: ")
            if resp.strip().lower() not in ("y", "yes"):
                print("Skipped by user")
                continue

        rc = run_shell(pull_cmd, args.dry_run)
        if rc == 0:
            print(f"Pull succeeded for {key}")
            entry["pulled"] = True
            updated = True
        else:
            print(f"Pull failed for {key} (rc={rc})")

    if updated:
        save_config(cfg_path, data)
        print(f"Updated config: {cfg_path}")


if __name__ == "__main__":
    main()

