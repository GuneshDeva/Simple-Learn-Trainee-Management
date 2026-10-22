from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import  ListModelMixin,RetrieveModelMixin,DestroyModelMixin,UpdateModelMixin
from rest_framework.exceptions import AuthenticationFailed
from .serializers import *
from django.contrib.auth import authenticate
from .models import User
from rest_framework import status
import jwt, datetime
import logging
from rest_framework import generics
from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.mail import send_mail
from django.contrib.auth.models import User
import random
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

User = get_user_model()
 
logger=logging.getLogger(__name__)

# Create your views here.
class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

class GetByEmail(generics.RetrieveAPIView):
      serializer_class = UserSerializer
      def get_object(self):
        email = self.kwargs['email']
        return User.objects.get(email=email)  
      
@method_decorator(csrf_exempt, name='dispatch')
class LoginView(APIView):

    authentication_classes = []
    permission_classes = []

    def post(self, request):
        data = request.data
        email = data.get('email')
        password = data.get('password')
        
        user = authenticate(email=email, password=password)

        if not user:
            raise AuthenticationFailed('Incorrect email or password!')

        payload = {
            'id': user.email,
            'iat': datetime.datetime.utcnow(),
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60)
        }

        token = jwt.encode(
            payload,
            'secret',
            algorithm='HS256'
        )

        user_details = User.objects.get(email=email)

        response = Response()

        response.set_cookie(
            key='jwt',
            value=token,
            httponly=True
        )

        response.data = {
            'jwt': token,
            'user': UserSerializer(user_details).data
        }

        return response
    
class UserView(APIView):
    def get(self, request):
        token = request.COOKIES.get('jwt')

        if not token:
            return Response({'message': 'Unauthenticated'}, status=status.HTTP_401_UNAUTHORIZED)

        try:
            payload = jwt.decode(token, 'secret', algorithms='HS256')
        except jwt.ExpiredSignatureError:
            return Response({'message': 'Token expired'}, status=status.HTTP_401_UNAUTHORIZED)

        user = User.objects.filter(email=payload['id']).first()
        print(user)
        serializer = UserSerializer(user)
        return Response(serializer.data) 

class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message': 'success'
        }
        return response
# class ForgotPassword():
#     def post():

class GetAllUsersEmail(GenericAPIView, ListModelMixin):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get(self, request):
        try:
            response = self.list(request)
            user_emails = [user['email'] for user in response.data]
            return Response(user_emails)
        except Exception as e:
            logger.exception("An error occurred while getting all user emails")
            return Response(status= status.HTTP_500_INTERNAL_SERVER_ERROR)
    


class GettingAllUsers(GenericAPIView,ListModelMixin):
     queryset = User.objects.all()
     serializer_class=UserSerializer
     def get(self,request):
        try:
           return self.list(request)
        except Exception as e:
            logger.exception("An error occurred while getting all users")
     
class UpdateUser(GenericAPIView,UpdateModelMixin):
      queryset = User.objects.all()
      serializer_class=UserSerializer
      def put(self,request,**kwargs):
          try:
            return self.update(request,**kwargs)
          except Exception as e:
              logger.exception("An error occurred while update a user: %s", str(e))
      
class DeleteUser(GenericAPIView,DestroyModelMixin):
       queryset = User.objects.all()
       serializer_class=UserSerializer
       def delete(self,request,**kwargs):
          try:
            return self.destroy(request,**kwargs)
          except Exception as e:
              logger.exception("An error occurred while delete the user: %s")
              print("id is not there")

class GetById(GenericAPIView,RetrieveModelMixin):
      queryset = User.objects.all()
      serializer_class=UserSerializer
      def get(self,request,**kwargs):
           try:
             return self.retrieve(request,**kwargs)  
           except Exception as e:
               logger.exception("An error occurred while getting a user By Id")         

class ForgotPasswordAPIView(APIView):
    def post(self, request):
        email = request.data.get('email')
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'message': 'User does not exist.'}, status=400)

        otp = random.randint(1000, 9999)
        logger.info(f'OTP: {otp}')  # Log the OTP value for debugging purposes

        # Send OTP to user's email
        subject = 'Password Reset OTP'
        message = f'Your OTP for password reset is: {otp}'
        from_email = 'exabc@gmail.com'
        recipient_list = [email]

        try:
            send_mail(subject, message, from_email, recipient_list, fail_silently=False)
            logger.info('OTP sent successfully')
            return Response({'message': 'OTP sent successfully.', 'otp': otp})
        except Exception as e:
            logger.error(f'Failed to send OTP: {e}')

        return Response({'message': 'Failed to send OTP.'}, status=500)
