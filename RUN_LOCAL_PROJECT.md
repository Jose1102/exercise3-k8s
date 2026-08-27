# 👥 Guía de Réplica para Colaboradores (Cómo ejecutar este proyecto)

Si deseas clonar y ejecutar este entorno GitOps localmente en tu máquina, sigue estas instrucciones paso a paso.

---

## 📋 Prerrequisitos

Antes de comenzar, asegúrate de contar con los siguientes elementos instalados en tu sistema:

* **Git**: Para clonar el repositorio.
* **Docker Desktop**: Con la opción *Enable Kubernetes* activada en `Settings > Kubernetes`.
* **Helm**: Para la gestión de paquetes en Kubernetes.

---

## 🚀 Paso a Paso para la Instalación

### 1. Clonar el repositorio

Abre tu terminal y descarga el proyecto:

```bash
git clone https://github.com/Jose1102/exercise3-k8s.git
```

### 2. Instalar ArgoCD en el clúster local

Crea el namespace dedicado e instala ArgoCD:

```bash
# 1. Crear el espacio de trabajo de ArgoCD
kubectl create namespace argocd

# 2. Descargar e instalar los manifiestos de ArgoCD
kubectl apply -n argocd --server-side --force-conflicts -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```

> **Nota:** Ejecuta `kubectl get pods -n argocd` y espera hasta que todos los pods estén en estado **Running**.

### 3. Acceder a la consola web de ArgoCD


Crea tunel de red y abre la interfaz de ArgoCD
```
kubectl port-forward svc/argocd-server -n argocd 8080:443          

```
* **Navegador:** Accede a `https://localhost:8080` (Acepta la advertencia del certificado de seguridad).
* **Usuario:** `admin`
* **Contraseña:** Para obtener la clave inicial generada por Kubernetes, ejecuta en otra ventana de terminal:

**En Linux / macOS:**
```bash
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d
```



### 4. Registrar y desplegar la aplicación en ArgoCD

1. En el panel de ArgoCD, haz clic en el botón **`+ NEW APP`**.
2. Completa el formulario con los siguientes datos:
   * **Application Name:** `mi-microservicio`
   * **Project Name:** `default`
   * **Sync Policy:** `Automatic` (Activa también *Prune Resources* y *Self Heal*).
   * **Repository URL:** La URL pública de este repositorio de GitHub.
   * **Revision:** `main`
   * **Path:** `app-chart`
   * **Cluster URL:** `https://kubernetes.default.svc`
   * **Namespace:** `default`
   * **Helm > Values Files:** Escribe únicamente `values-prod.yaml`.
3. Haz clic en **`CREATE`** (arriba a la izquierda).

### 5. Probar el microservicio desplegado

Una vez que ArgoCD marque la aplicación como **Synced** y **Healthy** (en verde), ejecuta el siguiente comando en tu terminal para habilitar el túnel local:

```bash
kubectl port-forward svc/$(kubectl get svc -l app.kubernetes.io/instance=mi-microservicio -o jsonpath='{.items[0].metadata.name}') 3000:3000
```

¡Listo! Abre tu navegador e ingresa a `http://localhost:3000` para ver el microservicio en funcionamiento.
