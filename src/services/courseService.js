const { ApperClient } = window.ApperSDK;

// Initialize ApperClient with Project ID and Public Key
const apperClient = new ApperClient({
  apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
  apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
});

const TABLE_NAME = 'course';

// Field names for course table - only updateable fields for create/update
const UPDATEABLE_FIELDS = [
  'Name', 'title', 'description', 'category', 'price', 
  'instructor_id', 'enrollment_count', 'rating', 'Tags'
];

// All fields for fetch operations
const ALL_FIELDS = [
  'Name', 'Tags', 'Owner', 'CreatedOn', 'CreatedBy', 'ModifiedOn', 'ModifiedBy',
  'title', 'description', 'category', 'price', 'instructor_id', 'enrollment_count', 'rating'
];

export const fetchAllCourses = async (filters = {}) => {
  try {
    const params = {
      fields: ALL_FIELDS,
      pagingInfo: {
        limit: filters.limit || 20,
        offset: filters.offset || 0
      }
    };

    // Add filtering if provided
    if (filters.category && filters.category !== 'all') {
      params.where = [{
        fieldName: 'category',
        operator: 'ExactMatch',
        values: [filters.category]
      }];
    }

    // Add search functionality
    if (filters.search) {
      const searchConditions = [
        {
          fieldName: 'title',
          operator: 'Contains',
          values: [filters.search]
        },
        {
          fieldName: 'description',
          operator: 'Contains',
          values: [filters.search]
        }
      ];

      if (params.where) {
        params.whereGroups = [{
          operator: 'AND',
          subGroups: [
            {
              conditions: params.where,
              operator: ''
            },
            {
              conditions: searchConditions,
              operator: 'OR'
            }
          ]
        }];
        delete params.where;
      } else {
        params.whereGroups = [{
          operator: 'OR',
          subGroups: [{
            conditions: searchConditions,
            operator: ''
          }]
        }];
      }
    }

    // Add sorting
    if (filters.sortBy) {
      params.orderBy = [{
        fieldName: filters.sortBy,
        SortType: filters.sortOrder || 'ASC'
      }];
    }

    const response = await apperClient.fetchRecords(TABLE_NAME, params);
    
    if (!response || !response.data) {
      return [];
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw new Error('Failed to fetch courses');
  }
};

export const getCourseById = async (courseId) => {
  try {
    const params = {
      fields: ALL_FIELDS
    };

    const response = await apperClient.getRecordById(TABLE_NAME, courseId, params);
    
    if (!response || !response.data) {
      return null;
    }

    return response.data;
  } catch (error) {
    console.error(`Error fetching course with ID ${courseId}:`, error);
    throw new Error('Failed to fetch course details');
  }
};

export const createCourse = async (courseData) => {
  try {
    // Filter to only include updateable fields
    const filteredData = {};
    UPDATEABLE_FIELDS.forEach(field => {
      if (courseData.hasOwnProperty(field)) {
        filteredData[field] = courseData[field];
      }
    });

    // Format data types properly
    if (filteredData.price) {
      filteredData.price = parseFloat(filteredData.price);
    }
    if (filteredData.enrollment_count) {
      filteredData.enrollment_count = parseInt(filteredData.enrollment_count);
    }
    if (filteredData.rating) {
      filteredData.rating = parseInt(filteredData.rating);
    }

    const params = {
      records: [filteredData]
    };

    const response = await apperClient.createRecord(TABLE_NAME, params);
    
    if (response && response.success && response.results) {
      const successfulRecords = response.results.filter(result => result.success);
      if (successfulRecords.length > 0) {
        return successfulRecords[0].data;
      }
    }
    
    throw new Error('Failed to create course');
  } catch (error) {
    console.error('Error creating course:', error);
    throw new Error('Failed to create course');
  }
};

export const updateCourse = async (courseId, updateData) => {
  try {
    // Filter to only include updateable fields
    const filteredData = { Id: courseId };
    UPDATEABLE_FIELDS.forEach(field => {
      if (updateData.hasOwnProperty(field)) {
        filteredData[field] = updateData[field];
      }
    });

    // Format data types properly
    if (filteredData.price) {
      filteredData.price = parseFloat(filteredData.price);
    }
    if (filteredData.enrollment_count) {
      filteredData.enrollment_count = parseInt(filteredData.enrollment_count);
    }
    if (filteredData.rating) {
      filteredData.rating = parseInt(filteredData.rating);
    }

    const params = {
      records: [filteredData]
    };

    const response = await apperClient.updateRecord(TABLE_NAME, params);
    
    if (response && response.success && response.results) {
      const successfulUpdates = response.results.filter(result => result.success);
      if (successfulUpdates.length > 0) {
        return successfulUpdates[0].data;
      }
    }
    
    throw new Error('Failed to update course');
  } catch (error) {
    console.error('Error updating course:', error);
    throw new Error('Failed to update course');
  }
};

export const deleteCourse = async (courseIds) => {
  try {
    const ids = Array.isArray(courseIds) ? courseIds : [courseIds];
    
    const params = {
      RecordIds: ids
    };

    const response = await apperClient.deleteRecord(TABLE_NAME, params);
    
    if (response && response.success) {
      return true;
    }
    
    throw new Error('Failed to delete course(s)');
  } catch (error) {
    console.error('Error deleting course(s):', error);
    throw new Error('Failed to delete course(s)');
  }
};

// Legacy methods for backward compatibility
export const getAll = fetchAllCourses;
export const getById = getCourseById;
export const create = createCourse;
export const update = updateCourse;
export const delete_ = deleteCourse;