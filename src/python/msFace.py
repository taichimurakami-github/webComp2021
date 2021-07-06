# imports
import asyncio
import io
import glob
import os
import sys
import time
import uuid
import requests
from urllib.parse import urlparse
from io import BytesIO

from PIL import Image, ImageDraw
from azure.cognitiveservices.vision.face import FaceClient
from msrest.authentication import CognitiveServicesCredentials
from azure.cognitiveservices.vision.face.models import TrainingStatusType, Person

KEY = "a27553b0195a46239a6d129bda16169e"
ENDPOINT = "https://webcomp2021-taichimurakami.cognitiveservices.azure.com/"

