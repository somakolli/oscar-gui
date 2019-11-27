#!/bin/bash
#ssh somakolli@krill.informatik.uni-stuttgart.de "rm -rf ~/www/htdocs/fgs.oscar-web.de/*"
scp -r /home/sokol/oscar-gui/dist/oscar-gui/* somakolli@krill.informatik.uni-stuttgart.de:"~/www/htdocs/fgs.oscar-web.de"
