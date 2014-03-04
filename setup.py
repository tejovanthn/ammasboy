try:
    from setuptools import setup
except ImportError:
    from distutils.core import setup

config = {
    'description': 'flaskapp',
    'author': 'Tejovanth N',
    'url': 'https://github.com/tejovanthn/flaskapp',
    'download_url': 'https://github.com/tejovanthn/flaskapp',
    'author_email': 'tejovanthn@gmail.com',
    'version': '0.1',
    'install_requires': ['nose'],
    'packages': ['flaskapp'],
    'scripts': [],
    'name': 'flaskapp'
}

setup(**config)
