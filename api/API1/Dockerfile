FROM python:3.9-slim

RUN apt-get update && apt-get install ffmpeg libsm6 libxext6  -y
RUN mkdir ./api
WORKDIR /api
COPY . .
RUN pip install --upgrade pip
RUN pip install --no-cache-dir --upgrade -r requirements.txt
CMD [ "uvicorn", "api:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "2"]
