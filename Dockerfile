# Build the image with:
# sudo docker build -t core-tests .

# And run it with
# sudo docker run -it core-tests ./run.sh stage
FROM selenium/standalone-chrome

USER root

RUN apt-get update \
 && apt-get install -y curl git wget gnupg libnotify4 gconf2 gconf-service libappindicator1 gconf-service-backend libgconf-2-4 gconf2-common libdbusmenu-gtk4 libindicator7 \
 && curl -sL https://deb.nodesource.com/setup_10.x | bash - \
 && apt-get install -y nodejs

COPY . /

RUN npm install \
 && chmod +x ./run.sh 
 # && chmod +x ./node_modules/cucumber/bin/cucumber-js

EXPOSE 4444
EXPOSE 80

CMD /run.sh stage