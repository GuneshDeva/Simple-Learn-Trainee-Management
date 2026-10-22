# The code is new added on 07.10.2026

import jwt

from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed

from Authentication.models import User


class CookieJWTAuthentication(BaseAuthentication):

    def authenticate(self, request):

        token = request.COOKIES.get('jwt')

        if not token:
            return None

        try:
            payload = jwt.decode(
                token,
                'secret',
                algorithms=['HS256']
            )
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Token expired')
        except jwt.InvalidTokenError:
            raise AuthenticationFailed('Invalid token')

        email = payload.get('id')

        if not email:
            raise AuthenticationFailed('Invalid token')

        user = User.objects.filter(email=email).first()

        if not user:
            raise AuthenticationFailed('User not found')

        return (user, token)