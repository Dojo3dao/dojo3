Model setup and instructions

1) Check for `ollama` on this machine:

```
command -v ollama || ollama --version
```

2) Install `ollama` if missing — follow the official instructions at https://ollama.com/install.

3) Pull the `deepseek-coder:6.7b` model:

```
ollama pull deepseek-coder:6.7b
```

4) Verify locally available models (Ollama command may vary by version):

```
ollama list
```

Admin note: `config/models_config.yaml` contains an example entry enabling `Claude Haiku 4.5` for `all_clients`. This is a repository-level config only; to actually enable the model across your deployment, apply equivalent settings in your runtime/management system.
