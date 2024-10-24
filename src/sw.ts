
const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
      // [::1] es la dirección IPv6 localhost.
      window.location.hostname === '[::1]' ||
      // 127.0.0.1/8 es considerada localhost para IPv4.
      window.location.hostname.match(
        /^127(?:\.[0-9]+){0,2}\.[0-9]+$/
      )
  )
  
  type Config = {
    onSuccess?: (registration: ServiceWorkerRegistration) => void
    onUpdate?: (registration: ServiceWorkerRegistration) => void
  }
  
  export function register(config?: Config) {
    if ('serviceWorker' in navigator) {
      const publicUrl = new URL(
        (process as { env: { [key: string]: string } }).env.PUBLIC_URL,
        window.location.href
      )
      if (publicUrl.origin !== window.location.origin) {
        return
      }
  
      window.addEventListener('load', () => {
        const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`
  
        if (isLocalhost) {
          // Esto es localhost. Probemos si el service worker aún existe o no.
          checkValidServiceWorker(swUrl, config)
  
          // Agrega algunos registros adicionales para localhost.
          navigator.serviceWorker.ready.then(() => {
            console.log(
              'Esta app se está ejecutando en modo localhost. ' +
              'Asegúrate de probar en producción para poder usar PWA completamente.'
            )
          })
        } else {
          // No es localhost. Simplemente registra el service worker.
          registerValidSW(swUrl, config)
        }
      })
    }
  }
  
  function registerValidSW(swUrl: string, config?: Config) {
    navigator.serviceWorker
      .register(swUrl)
      .then(registration => {
        registration.onupdatefound = () => {
          const installingWorker = registration.installing
          if (installingWorker == null) {
            return
          }
          installingWorker.onstatechange = () => {
            if (installingWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                // Aquí es donde puedes hacer algo cuando se detecte una nueva versión.
                console.log(
                  'Nuevo contenido está disponible; por favor, refresca.'
                )
  
                if (config && config.onUpdate) {
                  config.onUpdate(registration)
                }
              } else {
                // El contenido ha sido almacenado en caché para su uso sin conexión.
                console.log('El contenido se ha cacheado para su uso sin conexión.')
  
                if (config && config.onSuccess) {
                  config.onSuccess(registration)
                }
              }
            }
          }
        }
      })
      .catch(error => {
        console.error('Error durante el registro del service worker:', error)
      })
  }
  
  function checkValidServiceWorker(swUrl: string, config?: Config) {
    fetch(swUrl, {
      headers: { 'Service-Worker': 'script' }
    })
      .then(response => {
        const contentType = response.headers.get('content-type')
        if (
          response.status === 404 ||
          (contentType != null && contentType.indexOf('javascript') === -1)
        ) {
          navigator.serviceWorker.ready.then(registration => {
            registration.unregister().then(() => {
              window.location.reload()
            })
          })
        } else {
          // Registra el service worker
          registerValidSW(swUrl, config)
        }
      })
      .catch(() => {
        console.log(
          'No hay conexión a Internet. La aplicación se está ejecutando en modo fuera de línea.'
        )
      })
  }
  
  export function unregister() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready
        .then(registration => {
          registration.unregister()
        })
        .catch(error => {
          console.error(error.message)
        })
    }
  }
  