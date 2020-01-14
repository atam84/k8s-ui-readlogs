# k8s-ui-readlogs

Kubernetes UI to read pods log and information about pods, namespaces and cluster nodes.


# How to use it ?

  - As docker container:

sudo docker run -it -v /home/atam84/.kube/config:/root/.kube/config -p 8080:8080 atamdocker/k8s-ui-readlogs:latest

/home/atam84/.kube/config is kube config file.

The container must have network access to Kubernetes cluster 

 - Integrate in Kubernetes cluster :

kubectl apply -f https://raw.githubusercontent.com/atam84/k8s-ui-readlogs/master/kubernetes/k8s-ui-readlogs-deployment.yaml


PS: This tool does't use any database.
