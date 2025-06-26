# Git LFS Setup für ai4mbse_demo.mp4

## Das Video ist 112MB und braucht Git LFS

**Auf Ihrem lokalen System ausführen:**

```bash
# Git LFS installieren (falls noch nicht gemacht)
git lfs install

# Video-Datei für LFS konfigurieren
git lfs track ai4mbse/ai4mbse_demo.mp4

# Video hinzufügen und committen
git add ai4mbse/ai4mbse_demo.mp4 .gitattributes
git commit -m "Add ai4mbse_demo.mp4 via Git LFS"
git push
```

## Das Video wird dann richtig angezeigt!

Die AI4MBSE Seite hat nur **ein Video** - die doppelte Darstellung wird behoben.
