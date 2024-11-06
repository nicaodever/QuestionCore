FROM python:3.8-slim

RUN apt-get update && apt-get install -y \ 
    build-essential \
    unixodbc \
    unixodbc-dev \
    libpq-dev \
    python3-dev \
    && rm -rf /var/lib/apt/lists/*

COPY . .

EXPOSE 8080

COPY requirements.txt .

RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

COPY . . 

RUN mkdir -p assets/static && \
    python manage.py collectstatic --noinput

CMD ["python", "production-server.py"]



