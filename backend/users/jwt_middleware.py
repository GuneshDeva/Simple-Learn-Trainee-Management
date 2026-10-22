from django.http import JsonResponse
from django.utils.deprecation import MiddlewareMixin
import jwt


class JWTCookieMiddleware(MiddlewareMixin):

    def process_request(self, request):

        token = request.COOKIES.get('jwt')

        if not token:
            return None

        try:
            jwt.decode(
                token,
                'secret',
                algorithms=['HS256']
            )

        except jwt.ExpiredSignatureError:

            response = JsonResponse(
                {'detail': 'Token expired'},
                status=401
            )

            response.delete_cookie('jwt')

            return response

        except jwt.InvalidTokenError:

            response = JsonResponse(
                {'detail': 'Invalid token'},
                status=401
            )

            response.delete_cookie('jwt')

            return response

        return None