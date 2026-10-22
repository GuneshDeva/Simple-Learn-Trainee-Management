from django.urls import path
from .views import *
urlpatterns=[
    # Location
     path('locationinsertandgettingall/',LocationCreateListAPIView.as_view(),name="LocationInsertandGettingall"),
    path('locationupdateandDeleteandretraivebyid/<int:pk>/',LocationRetrieveUpdateDeleteAPIView.as_view(),name="LocationUpdateAndDeleteAndRetraiveByID"),

    #Branch
     path('branchinsertandgettingall/',BranchCreateListAPIView.as_view(),name="branchInsertandGettingall"),
    path('branchupdateanddeleteandretraivebyid/<int:pk>/',BranchRetrieveUpdateDeleteAPIView.as_view(),name="BranchupdateAndDeleteAndRetraiveByID"),
    #Batch
    path('batchinsertandgettingall/',BatchInsertandGettingall.as_view(),name="batchInsertandGettingall"),
    path('batchupdateanddeleteandretraivebyid/<int:pk>/',BatchupdateAndDeleteAndRetraiveByID.as_view(),name="batchupdateAndDeleteAndRetraiveByID"),
    #Course
    path('courseinsertandgettingall/',CourseInsertandGettingall.as_view(),name="courseInsertandGettingall"),
    path('courseupdateanddeleteandretraivebyid/<int:pk>/',CourseupdateAndDeleteAndRetraiveByID.as_view(),name="CourseupdateAndDeleteAndRetraiveByID"),
    #Subject
   path('subjects/', SubjectListCreateView.as_view(), name='trainer-list'),
    path('subjects/<int:pk>/', SubjectRetrieveUpdateDestroyView.as_view(), name='subject-retrieve-update-destroy'),
    #Trainer
    path('trainers/', TrainerListCreateView.as_view(), name='trainer-list-create'),
    path('trainers/<int:pk>/', TrainerRetrieveUpdateDestroyView.as_view(), name='trainer-retrieve-update-destroy'),
    #Topics
    path('topicinsertandgettingall/',TopicInsertandGettingall.as_view(),name="TopicInsertandGettingall"),
    path('topicupdateAndDeleteAndRetraiveByID/<int:pk>/',TopicupdateAndDeleteAndRetraiveByID.as_view(),name="TopicupdateAndDeleteAndRetraiveByID"),
    #Address
    path('addressinsertandgettingall/',AddressInsertandGettingall.as_view(),name="AddressInsertandGettingall"),
    path('addressupdateanddeleteandretrievebyid/<int:pk>/',AddressUpdateAndDeleteAndRetrieveByID.as_view(),name=" AddressUpdateAndDeleteAndRetrieveByID"),
    #Traineee
    path('traineeinsertandgettingall/',TraineeInsertandGettingall.as_view(),name="TraineeInsertandGettingall"),
    path('traineeupdateanddeleteandretrievebyid/<int:pk>/',TraineeUpdateAndDeleteAndRetrieveByID.as_view(),name=" TraineeUpdateAndDeleteAndRetrieveByID"),
    

]

