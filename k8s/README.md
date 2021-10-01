helm repo add bitnami https://charts.bitnami.com/bitnami
helm install postgres bitnami/postgresql -n demo -f values.yaml 