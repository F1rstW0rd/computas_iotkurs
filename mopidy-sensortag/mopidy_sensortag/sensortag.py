import pykka
import logging
import serial
import time
import threading

from mopidy.core import CoreListener

logger = logging.getLogger(__name__)

class SensorTagFrontend(pykka.ThreadingActor, CoreListener):
    def __init__(self, config, core):
        super(SensorTagFrontend, self).__init__()

        self.config = config
        self.core = core

