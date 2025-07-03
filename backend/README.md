# Backend

## Ejecución en local

Después de clonar, crea un entorno virtual y actívalo

```
python -m venv venv
venv\Scripts\activate
```

Dirígete a la carpeta backend (proyecto) e instala las dependencias

```
pip install -r requirements.txt
```

Migra la base de datos

```
python manage.py migrate
```

Ejecuta el servidor

```
python manage.py runserver
```

