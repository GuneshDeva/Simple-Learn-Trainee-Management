from django.shortcuts import render
from datetime import date
from django.shortcuts import render
from rest_framework.response import *
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import CreateModelMixin, ListModelMixin, UpdateModelMixin, DestroyModelMixin, RetrieveModelMixin
from .models import *
from .serializer import BranchSerializer,LocationSerializer,BatchSerializer,CourseSerializer,SubjectSerializer,TrainerSerializer,TopicsSerializer,AddressSerializer,TraineeSerializer
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework import generics, status

# Create your views here.
class BranchCreateListAPIView(APIView):
    def get(self, request):
        branches = Branch.objects.all()
        serializer = BranchSerializer(branches, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = BranchSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BranchRetrieveUpdateDeleteAPIView(GenericAPIView, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin):
    queryset = Branch.objects.all()
    serializer_class = BranchSerializer
    
    @csrf_exempt
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)
    
    @csrf_exempt
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
    
    @csrf_exempt
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
    


class LocationCreateListAPIView(GenericAPIView, CreateModelMixin, ListModelMixin):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
    
    @csrf_exempt
    def post(self, request):
        return self.create(request)
    
    @csrf_exempt
    def get(self, request):
        return self.list(request)


class LocationRetrieveUpdateDeleteAPIView(GenericAPIView, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
    
    @csrf_exempt
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)
    
    @csrf_exempt
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
    
    @csrf_exempt
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
    


import logging

logger=logging.getLogger(__name__)

class BatchInsertandGettingall(GenericAPIView, CreateModelMixin, ListModelMixin):
    queryset = Batch.objects.all()
    serializer_class = BatchSerializer

    def post(self, request, *args, **kwargs):
        logger.info("Data inserted successfully")
        return self.create(request, *args, **kwargs)

    def get(self, request, *args, **kwargs):

        if request.user.role.lower() == 'admin':
            self.queryset = Batch.objects.all()

        else:
            self.queryset = Batch.objects.filter(
                branch__branch_id=request.user.branch_id)

        return self.list(request, *args, **kwargs)
     

class BatchupdateAndDeleteAndRetraiveByID(GenericAPIView,UpdateModelMixin,DestroyModelMixin,RetrieveModelMixin):
     queryset=Batch.objects.all()
     serializer_class=BatchSerializer
     def put(self,request,**kwargs):
          logger.info("data updated successfully")
          return self.update(request,**kwargs)
     def delete(self,request,**kwargs):
          logger.info("deleted successfully")
          return self.destroy(request,**kwargs)
     def get(self,request,**kwargs):
          return self.retrieve(request,**kwargs)
     


logger=logging.getLogger(__name__)


class CourseInsertandGettingall(GenericAPIView,CreateModelMixin,ListModelMixin):
    queryset = Course.objects.all()
    serializer_class=CourseSerializer
    #  def post(self,request):
    #       logging.info("Data inserted successfully..")
    #       return self.create(request)
    #  def get(self,request):
    #     return self.list(request)
    def get(self, request, format=None):
        courses = Course.objects.all()
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        subjects_ids = request.data.pop('subjects', [])  # Extract trainer IDs from request data
        serializer = CourseSerializer(data=request.data)
        if serializer.is_valid():
            subject = serializer.save()
            subject.subjects.set(subjects_ids)  # Assign trainers to the subject
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CourseupdateAndDeleteAndRetraiveByID(GenericAPIView,UpdateModelMixin,DestroyModelMixin,RetrieveModelMixin):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    # def put(self, request, **kwargs):
    #     logging.info("Data updated successfully")
    #     return self.update(request, **kwargs)
    def put(self, request, **kwargs):
        course_id = kwargs.get('pk')

        data = request.data.copy()
        subjects_ids = data.pop('subjects', None)

        course = Course.objects.get(pk=course_id)

        serializer = CourseSerializer(course, data=data)

        if serializer.is_valid():
            course = serializer.save()

            if subjects_ids is not None:
                course.subjects.set(subjects_ids)

            logging.info("Data updated successfully")

            return Response(CourseSerializer(course).data)

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    def delete(self, request, **kwargs):
        logging.info("deleted successfully..")
        return self.destroy(request, **kwargs)

    def get(self, request, **kwargs):
        return self.retrieve(request, **kwargs)




from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Subjects, Trainer
from .serializer import SubjectSerializer, TrainerSerializer
# from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated



class SubjectListCreateView(APIView):
    def get(self, request, format=None):
        subjects = Subjects.objects.all()
        serializer = SubjectSerializer(subjects, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        trainer_ids = request.data.pop('trainer', [])  # Extract trainer IDs from request data
        serializer = SubjectSerializer(data=request.data)
        if serializer.is_valid():
            subject = serializer.save()
            subject.trainer.set(trainer_ids)  # Assign trainers to the subject
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SubjectRetrieveUpdateDestroyView(APIView):
    def get(self, request, pk, format=None):
        subject = Subjects.objects.get(pk=pk)
        serializer = SubjectSerializer(subject)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        subject = Subjects.objects.get(pk=pk)
        serializer = SubjectSerializer(subject, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        subject = Subjects.objects.get(pk=pk)
        subject.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class TrainerListCreateView(generics.ListCreateAPIView):
    queryset = Trainer.objects.all()
    serializer_class = TrainerSerializer

    def post(self, request, format=None):
        subject_ids = request.data.pop('subjects', [])
        serializer = TrainerSerializer(data=request.data)
        if serializer.is_valid():
            trainer = serializer.save()
            trainer.subjects.set(subject_ids)  # Assign subjects to the trainer
            return Response(serializer.data, status=status.HTTP_201_CREATED) 
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class TrainerRetrieveUpdateDestroyView(APIView):
    def get(self, request, pk, format=None):
        trainer = Trainer.objects.get(pk=pk)
        serializer = TrainerSerializer(trainer)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        trainer = Trainer.objects.get(pk=pk)
        serializer = TrainerSerializer(trainer, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data) 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        trainer = Trainer.objects.get(pk=pk)
        trainer.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class TopicInsertandGettingall(GenericAPIView,CreateModelMixin,ListModelMixin):
     queryset = Topics.objects.all()
     serializer_class=TopicsSerializer
     def post(self,request):
          logger.info("Data inserted successfully")
          return self.create(request)
     def get(self,request):
        return self.list(request)
     
class TopicupdateAndDeleteAndRetraiveByID(GenericAPIView,UpdateModelMixin,DestroyModelMixin,RetrieveModelMixin):
     queryset=Topics.objects.all()
     serializer_class=TopicsSerializer
     def put(self,request,**kwargs):
          logger.info("data updated successfully")
          return self.update(request,**kwargs)
     def delete(self,request,**kwargs):
          logger.info("deleted successfully")
          return self.destroy(request,**kwargs)
     def get(self,request,**kwargs):
          return self.retrieve(request,**kwargs)
     


class  AddressInsertandGettingall(GenericAPIView,CreateModelMixin,ListModelMixin):
        queryset = Address.objects.all()
        serializer_class=AddressSerializer
        def post(self,request):
            logger.info("records inserted")
            return self.create(request)
        def get(self,request):
            logger.info("records fetched")
            return self.list(request)


# @csrf_exempt
class  AddressUpdateAndDeleteAndRetrieveByID(GenericAPIView,UpdateModelMixin,DestroyModelMixin,RetrieveModelMixin):
     queryset=Address.objects.all()
     serializer_class=AddressSerializer
     def put(self,request,**kwargs):
          logger.info("records updated")
          return self.update(request,**kwargs)
     def delete(self,request,**kwargs):
          logger.info("records deleted")
          return self.destroy(request,**kwargs)
     def get(self,request,**kwargs):
          return self.retrieve(request,**kwargs)
     

class TraineeInsertandGettingall(GenericAPIView,CreateModelMixin,ListModelMixin):
        queryset = Trainee.objects.all()
        serializer_class=TraineeSerializer
        def post(self,request):
            logger.info("records inserted")
            return self.create(request)
        def get(self,request):
            logger.info("records fetched")
            return self.list(request)


# @csrf_exempt
class  TraineeUpdateAndDeleteAndRetrieveByID(GenericAPIView,UpdateModelMixin,DestroyModelMixin,RetrieveModelMixin):
     queryset=Trainee.objects.all()
     serializer_class=TraineeSerializer
     def put(self,request,**kwargs):
          logger.info("records updated")
          return self.update(request,**kwargs)
     def delete(self,request,**kwargs):
          logger.info("records deleted")
          return self.destroy(request,**kwargs)
     def get(self,request,**kwargs):
          return self.retrieve(request,**kwargs)
     

     
class addImage(generics.CreateAPIView):
    print()
    queryset = Trainer.objects.all()
    serializer_class = TrainerSerializer


class getAllImages(generics.ListAPIView):
    queryset = Trainer.objects.all()
    serializer_class = TrainerSerializer