# FlavorTown Mobile Build Makefile

.PHONY: build apk install clean

# Default: build the web app
build:
	npm run build

# APK Build Pipeline
# Usage: make apk build release
apk: build
	npx cap sync
	npx cap open android

# Shortcut for the full release build command
# Note: This expects Capacitor and Android platform to be initialized
build-release: apk
	@echo "Opening Android Studio for final APK signing and release..."

# The user's specific requested command
release: apk

# Helper to push to a new repository
# Usage: make push URL=https://github.com/user/repo.git
push:
	@if [ -z "$(URL)" ]; then echo "Usage: make push URL=your_repo_url"; exit 1; fi
	git remote set-url origin $(URL)
	git add .
	git commit -m "Production release: FlavorTown v1.0.0" || echo "No changes to commit"
	git branch -M main
	git push -u origin main
