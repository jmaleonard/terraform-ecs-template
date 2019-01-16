FROM tarampampam/node:alpine
LABEL MAINTAINER 'Jared Leonard <jmaleonard@github.com>'
COPY src app
COPY package.json app
RUN cd app && yarn
EXPOSE 8000 443
COPY files/startscript.sh /root/startscript.sh
RUN chmod +x /root/startscript.sh 
ENTRYPOINT ["bash", "/root/startscript.sh"]
