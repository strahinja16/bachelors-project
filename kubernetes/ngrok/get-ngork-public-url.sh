kubectl exec $(kubectl get pods -n dev -l=app=ngrok -o=jsonpath='{.items[0].metadata.name}') -n dev -- curl http://localhost:4040/api/tunnels
