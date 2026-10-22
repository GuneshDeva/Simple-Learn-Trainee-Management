import logging
from rest_framework import serializers
from .models import Location, Branch, Course, Batch, Subjects, Trainer, Topics, Address, Trainee
from datetime import date
from django.core.files.images import get_image_dimensions
from django.utils.encoding import smart_str
from django.conf import settings


class LocationSerializer(serializers.ModelSerializer):
    
    branch_ids = serializers.SerializerMethodField()
    class Meta:
        model = Location
        fields = ['location_id', 'branch_ids', 'city']
    def get_branch_ids(self, obj):
        branches = obj.branch_set.all()
        return [branch.branch_id for branch in branches]

class BranchSerializer(serializers.ModelSerializer):
    created_on = serializers.DateField(default=date.today)
    updated_on = serializers.DateField(default=date.today)
    location = LocationSerializer(source='location_id', read_only=True)
    subjects = serializers.SerializerMethodField()

    class Meta:
        model = Branch
        # fields = ['branch_id', 'branch_name', 'status', 'created_by', 'created_on', 'updated_by', 'updated_on', 'location', 'subjects']
        fields='__all__'
    def create(self, validated_data):
        validated_data['created_on'] = date.today()
        return super().create(validated_data)

    def update(self, instance, validated_data):
        validated_data['updated_on'] = date.today()
        return super().update(instance, validated_data)

    def get_subjects(self, obj):
        subjects = obj.subjects.all()
        subject_data = []
        for subject in subjects:
            subject_data.append({
                'subject_Id': subject.subject_Id,
                'subject_name': subject.subject_name,
                'created_by': subject.created_by,
                'created_on': subject.created_on,
                'updated_by': subject.updated_by,
                'updated_on': subject.updated_on
            })
        return subject_data

class CourseSerializer(serializers.ModelSerializer):
    subjects = serializers.SerializerMethodField() # Use the SubjectSerializer
    batch_ids = serializers.SerializerMethodField()
    

    class Meta:
        model=Course
        fields = ['course_id','course_name','course_duration','course_fee','subjects','created_at','batch_ids']

    
   
    def get_subjects(self, obj):
        subjects = obj.subjects.all()
        subjects_data=[]
        for subject in subjects:
            subjects_data.append({
                'id': subject.subject_Id,
                'name': subject.subject_name,
                'created_by':subject.created_by,
                'created_on':subject.created_on,
                'updated_by':subject.updated_by,
                'updated_on':subject.updated_on
               
            
            })
            print(subjects_data)
        return subjects_data
   
    
    def get_batch_ids(self, obj):
        batches = obj.batch_set.all()
        return [batch.batch_id for batch in batches]
    

class BatchSerializer(serializers.ModelSerializer):
    branch = serializers.PrimaryKeyRelatedField(queryset=Branch.objects.all())
    course = serializers.PrimaryKeyRelatedField(queryset=Course.objects.all())
    trainees_ids = serializers.SerializerMethodField()
    branches = BranchSerializer(source='branch', read_only=True)
    courses = CourseSerializer(source='course', read_only=True)

    class Meta:
        model = Batch
        fields = ['batch_id', 'batch_name', 'trainees_ids', 'branch', 'course', 'branches', 'courses']
        
    def get_trainees_ids(self, obj):
        trainees = obj.trainee_set.all()
        return [trainee.trainee_id for trainee in trainees]
    
    def to_representation(self, instance):
        request = self.context.get('request')
        if request and request.method == 'GET':
            self.fields.pop('branch', None)
            self.fields.pop('course', None)
        
        return super().to_representation(instance)
    
    def get_batches(self, obj):
        branches = obj.branches.all()
        branch_data=[]
        for branch in branches:
            branch_data.append({
                'subject_Id': branch.branch_id,
                'subject_name': branch.branch_name,
                'created_by':branch.created_by,
                'created_on':branch.created_on,
                'updated_by':branch.updated_by,
                'updated_on':branch.updated_on,
                'subjects':branch.subjects,

               
            
            })
            # print(subjects_data)
        return branch_data

class SubjectSerializer(serializers.ModelSerializer):
    trainer = serializers.SerializerMethodField()
    topic_ids = serializers.SerializerMethodField()
    courses = serializers.SerializerMethodField()
    branches = serializers.PrimaryKeyRelatedField(source='batches',queryset=Branch.objects.all(), many=True, required=False)

    def create(self, validated_data):
        branches_data = validated_data.pop('branches', [])
        subject = Subjects.objects.create(**validated_data)
        # subject.branches.set(branches_data)             /*commented on 29.08.2026*/
        subject.batches.set(branches_data)
        return subject

    def get_trainer(self, obj):
        trainers = obj.trainer.all()
        trainer_data = []
        for trainer in trainers:
            trainer_data.append({
                'trainer_Id': trainer.trainer_Id,
                'trainer_name': trainer.trainer_name,
                'created_by': trainer.created_by,
                'created_on': trainer.created_on,
                'updated_by': trainer.updated_by,
                'updated_on': trainer.updated_on
            })
        return trainer_data

    def get_courses(self, obj):
        courses = obj.courses.all()
        course_data = []
        for course in courses:
            course_data.append({
                'course_id': course.course_id,
                'course_name': course.course_name,
                'course_duration': course.course_duration,
                'course_fee': course.course_fee,
                'created_at': course.created_at
            })
        return course_data

    def get_topic_ids(self, obj):
        topics = obj.topics_set.all()
        return [topic.topic_id for topic in topics]

    class Meta:
        model = Subjects
        fields = ['subject_Id', 'subject_name', 'created_by', 'created_on', 'updated_by', 'updated_on', 'trainer', 'topic_ids', 'courses', 'branches']

class TopicsSerializer(serializers.ModelSerializer):
    subjects = SubjectSerializer(source='subject_Id',read_only=True)

    class Meta:
        model = Topics
        fields = ['topic_id', 'topic_name', 'subject_Id', 'subjects']

    def get_subjects(self, obj):
        subject = obj.subject_Id
        if subject:
            try:
                subject = Subjects.objects.get(id=subject.id)
                return SubjectSerializer(subject).data
            except Subjects.DoesNotExist:
                pass
        return None
    
    def to_representation(self, instance):
        request = self.context.get('request')
        if request and request.method == 'GET':
            self.fields.pop('subject_Id', None)
        
        return super().to_representation(instance)


   
    


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model=Address
        fields='__all__'


class TraineeSerializer(serializers.ModelSerializer):
    address_id = AddressSerializer()
    batches = BatchSerializer(source='batch_id',read_only=True)

    class Meta:
        model = Trainee
        fields = ['trainee_id','trainee_name','trainee_age','trainee_gender','batch_id','address_id','batches','trainee_phonenumber','trainee_email']

    def create(self, validated_data):
        address_data = validated_data.pop('address_id')
        address = Address.objects.create(**address_data)
        trainee = Trainee.objects.create(address_id=address, **validated_data)
        return trainee
    
    def get_batches(self, obj):
        batch = obj.batch_id
        if batch:
            try:
                batch = Batch.objects.get(id=batch.id)
                return BatchSerializer(batch).data
            except Batch.DoesNotExist:
                pass
        return None
    
    def get_subjects(self, obj):
        subjects = obj.subjects.all()
        subjects_data=[]
        for subject in subjects:
            subjects_data.append({
                'id': subject.subject_Id,
                'name': subject.subject_name,
                'created_by':subject.created_by,
                'created_on':subject.created_on,
                'updated_by':subject.updated_by,
                'updated_on':subject.updated_on
               
                # Add any other desired trainer fields here
            })
            print(subjects_data)
        return subjects_data
    def to_representation(self, instance):
        request = self.context.get('request')
        if request and request.method == 'GET':
            self.fields.pop('batch_id', None)
        
        return super().to_representation(instance)
    
    def update(self, instance, validated_data):
        address_data = validated_data.pop('address_id', None)
        if address_data:
            address_serializer = self.fields['address_id']
            address = instance.address_id
            updated_address = address_serializer.update(address, address_data)
            validated_data['address_id'] = updated_address

        return super().update(instance, validated_data)

class TrainerSerializer(serializers.ModelSerializer):
    address = AddressSerializer(source='address_id')
    trainer_image = serializers.ImageField(
        write_only=True, required=False, allow_null=True)
    image_url = serializers.SerializerMethodField(read_only=True)
    subjects = serializers.PrimaryKeyRelatedField(
        queryset=Subjects.objects.all(),
        many=True,
        required=False,
        default=[])

    subject = serializers.SerializerMethodField()

    def get_subject(self, obj):
        subjects = obj.subjects.all()
        subjects_data = []
        for subject in subjects:
            subjects_data.append({
                'subject_id': subject.subject_Id,
                'subject_name': subject.subject_name,
                'created_by': subject.created_by,
                'created_on': subject.created_on,
                'updated_by': subject.updated_by,
                'updated_on': subject.updated_on


            })
            print(subjects_data)
        return subjects_data

    def get_image_url(self, obj):
        logging.error("+++++++++++++++++++")
        logging.error(obj.trainer_image)
        if obj.trainer_image:
            image_path = smart_str(obj.trainer_image)
            return self.context['request'].build_absolute_uri(settings.MEDIA_URL + image_path)
        return None

    def create(self, validated_data):
        address_data = validated_data.pop('address_id')
        address_serializer = AddressSerializer(data=address_data)
        address_serializer.is_valid(raise_exception=True)
        address = address_serializer.save()

        trainer_image = validated_data.pop('trainer_image', None)
        subjects = validated_data.pop('subjects')

        trainer = Trainer.objects.create(address_id=address, **validated_data)
        
        # try:
        #     this = Trainer.objects.get(trainer_id=self.trainer_id)
        #     if this.trainer_image != self.trainer_image:
        #         this.trainer_image.delete(save=False)
        # except:
        #     pass
        if trainer_image:
            trainer.trainer_image = trainer_image
            trainer.save()
            # subjects = validated_data.pop('subjects')
        trainer.subjects.set(subjects)

        return trainer

    # The below def update() is added newly to update the 'Trainer-form'   -29.09.2026
    def update(self, instance, validated_data):
        # Get nested address data
        address_data = validated_data.pop('address_id', None)

        # Get subjects data
        subjects = validated_data.pop('subjects', None)

        # Get image data
        trainer_image = validated_data.pop('trainer_image', None)

        # Update normal Trainer fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        # Update trainer image if a new image was provided
        if trainer_image is not None:
            instance.trainer_image = trainer_image

        instance.save()

        # Update Address
        if address_data:
            address = instance.address_id

            for attr, value in address_data.items():
                setattr(address, attr, value)

            address.save()

        # Update Subjects
        if subjects is not None:
            instance.subjects.set(subjects)

        return instance
    class Meta:
        model = Trainer
        fields = ['trainer_Id', 'trainer_name', 'trainer_phonenumber', 'trainer_email',
                  'trainer_age', 'trainer_gender', 'created_by', 'created_on',
                  'updated_by', 'updated_on', 'address', 'subjects', 'subject', 'trainer_image', 'image_url']
        

        