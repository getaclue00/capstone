class AddReferencesToCars < ActiveRecord::Migration[5.0]
  def up
  	#this adds client_id column in cars table
    add_reference :cars, :client, foreign_key: true, index: true, null: true
  end
  def down
  	remove_reference :cars, :client, foreign_key: true, index: true, null: true
  end
end

#NOTE: Once we set up the Ember to pass client id, get rid of the "optional true"
