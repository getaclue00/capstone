# config/initializers/active_model_serializers.rb
require 'active_model_serializers/register_jsonapi_renderer'

ActiveModelSerializers.config.adapter = ActiveModelSerializers::Adapter::JsonApi #setting the adapter to :json_api
ActiveModelSerializers.config.key_transform = :unaltered #leave payloads to the server unaltered. Rails has underscores naturally, we force underscores upon Ember

# ActiveSupport.on_load(:action_controller) do
#   require 'active_model_serializers/register_jsonapi_renderer'
# end

